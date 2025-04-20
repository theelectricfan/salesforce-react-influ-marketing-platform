@RestResource(urlMapping='/auth/signup')
global with sharing class SignUpController {
    public SignUpController() {

    }

    @HttpPost
    global static void doSignup(){
        RestResponse req = RestContext.request;
        RestRequest res = RestContext.response;
        string jsonStr = req.requestBody.toString();

        ResponseBodyClass responseBody = new ResponseBodyClass();

        try{
            RequestBodyClass reqBody = (RequestBodyClass)JSON.deserialize(jsonStr, RequestBodyClass.class);


        }
    }

    private class RequestBodyClass{
        public String email;
        public String hashedPassword;
        public String type;
    }
    private class ResponseBodyClass{

    }
}