@RestResource(urlMapping='/auth/signup')
global with sharing class SignUpBrandApi {

    @HttpPost
    global static void brandSignup(){
        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;
        string jsonStr = req.requestBody.toString();

        ResponseBodyClass resBody = new ResponseBodyClass();

        try{
            RequestBodyClass reqBody = (RequestBodyClass)JSON.deserialize(jsonStr, RequestBodyClass.class);
            if(reqBody == null){
                res.addHeader('Content-Type', 'application/json');
                res.statusCode = 400;
                resBody.StatusCode = 400;
                resBody.Status = 'Error';
                resBody.Message = 'Invalid Request Body';
                String resBodyStr = JSON.serialize(resBody);
                res.responseBody = Blob.valueOf(resBodyStr);
                return;
            }         
            
            String doubleHashedPassword = EncodingUtil.convertToHex(Crypto.generateDigest('SHA-256', Blob.valueOf(reqBody.hashedPassword)));

            Brand__c brand = new Brand__c(
                Name = reqBody.name,
                Industry__c = String.join(reqBody.industry, ';'),
                Email__c = reqBody.email,
                Phone__c = reqBody.phone,
                PasswordHash__c = doubleHashedPassword
            );
            insert brand;

            res.addHeader('Content-Type', 'application/json');
            res.statusCode = 201;
            resBody.StatusCode = 201;
            resBody.Status = 'Success';
            resBody.Message = 'You have signed up successfully';
            String resBodyStr = JSON.serialize(resBody);
            res.responseBody = Blob.valueOf(resBodyStr);
        }
        catch (Exception e) {
            res.addHeader('Content-Type', 'application/json');
            res.statusCode = 400;
            resBody.StatusCode = 400;
            resBody.Status = 'Error';
            resBody.Message = e.getMessage();
            String resBodyStr = JSON.serialize(resBody);
            res.responseBody = Blob.valueOf(resBodyStr);
        }
    }

    private class RequestBodyClass{
        public String name;
        public List<String> industry;
        public String email;
        public String phone;
        public String hashedPassword;
    }
    private class ResponseBodyClass{
        public Integer StatusCode;
        public String Status;
        public String Message;
    }
}