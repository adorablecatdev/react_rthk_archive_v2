import { notification } from "antd";
import { useEffect } from "react";

const NotificationEn = ({ show, message, type }) =>
{
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (error) =>
    {
        api[error]({
            message: '提示',
            description: message
        });
    };

    useEffect(() =>
    {
        async function innerFun()
        {
            if (show > 0)
            {
                await new Promise(resolve => setTimeout(resolve, 200));
                openNotificationWithIcon(type);
            }
        }
        innerFun();
    }, [show])

    return (
        <>
            {contextHolder}
        </>
    )
}

export default NotificationEn;