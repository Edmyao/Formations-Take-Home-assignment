import React, { Fragment } from "react";

interface AlertMessageProps {
    message: string | null;
}
function AlertMessage({ message }: AlertMessageProps) {
    if (!message || message.length === 0) {
        return <Fragment />;
    }
    return (
        <div className={"alert-message"} data-testid="alert-message">
            {message}
        </div>
    );
}
export default AlertMessage;
