import React from "react";
import { useSelector } from "react-redux";

export const Alert = () => {
    const alerts = useSelector((state) => state.alerts);
    return (
        <>
            {alerts.map((alert) => (
                <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                    {alert.message}
                </div>
            ))}
        </>
    );
};
