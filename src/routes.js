import Blog from "./components/Blog/Blog";
import Home from "./components/Home/Home";
import AboutMe from "./components/AboutMe/AboutMe";
import Login from "./components/Auth/Login"

const routes = {
	home: {
		path: "/",
		component: Home,
		text: "Home"
	},
	aboutMe: {
		path: "/aboutMe",
		component: AboutMe,
		text: "About Me"
	},
	blog: {
		path: "/blog",
		component: Blog,
		text: "Blog"
	},
	login: {
		path: "/login",
		component: Login,
		text: "Login"
	}
}

export default routes