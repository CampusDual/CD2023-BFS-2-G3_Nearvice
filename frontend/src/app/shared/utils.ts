export function getLoggedUser() {
	const LOCAL_STORAGE_DATA = localStorage.getItem("com.ontimize.web.ngx.jee.seed");
	const sessionData = JSON.parse(LOCAL_STORAGE_DATA);
	return sessionData.session.user;
}
