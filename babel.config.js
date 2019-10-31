module.exports = {
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react",
    ],
    "plugins": [
        [
            "react-intl",
            {
                "messagesDir": "./build/messages/",
            },
        ],
        "@babel/plugin-proposal-class-properties",
    ],
};
