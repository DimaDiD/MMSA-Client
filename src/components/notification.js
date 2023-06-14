import { notification } from 'antd';

const notificationLogic = (type, text, icon = null) => {
    (notification[type])({
        message: 'Нове повідомлення',
        icon: icon,
        description: text
    });
};

export default notificationLogic;