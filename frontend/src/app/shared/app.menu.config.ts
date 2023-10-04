import { MenuRootItem } from "ontimize-web-ngx";

export const MENU_CONFIG: MenuRootItem[] = [
	{ id: "home", name: "HOME", icon: "home", route: "/main/home" },
	{
		id: "services",
		name: "SERVICES",
		icon: "business_center",
		route: "/main/services",
	},
	{ id: "mailbox", name: "MAILBOX", icon: "mail", route: "/main/mailbox" },
	{
		id: "logout",
		name: "LOGOUT",
		route: "/login",
		icon: "power_settings_new",
		confirm: "yes",
	},
];
