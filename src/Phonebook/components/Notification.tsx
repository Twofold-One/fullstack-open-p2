import React from 'react';

interface NotificationProps {
    message: string | null;
}

const Notification = ({ message }: NotificationProps) => {
    if (message === null) {
        return null;
    }
    return <div className="notification">{message}</div>;
};

export default Notification;
