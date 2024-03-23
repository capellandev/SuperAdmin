import { defineMiddleware } from "astro:middleware";
import { supabase } from "../lib/supabase";
import micromatch from "micromatch";

// Rutas que no quieres proteger
const unprotectedRoutes = ["/sign-in(|/)", "/api/**"];

export const onRequest = defineMiddleware(async ({ locals, url, cookies, redirect }, next) => {
	// Verifica si la ruta actual debe estar desprotegida
	if (micromatch.isMatch(url.pathname, unprotectedRoutes)) {
		return next(); // Continúa sin aplicar protección
	}

	// Desde aquí en adelante, todas las rutas están protegidas excepto las especificadas en `unprotectedRoutes`
	const accessToken = cookies.get("sb-access-token");
	const refreshToken = cookies.get("sb-refresh-token");

	if (!accessToken || !refreshToken) {
		return redirect("/sign-in");
	}

	const { data, error } = await supabase.auth.setSession({
		refresh_token: refreshToken.value,
		access_token: accessToken.value,
	});

	if (error) {
		cookies.delete("sb-access-token", {
			path: "/",
		});
		cookies.delete("sb-refresh-token", {
			path: "/",
		});
		return redirect("/sign-in");
	}

	locals.email = data.user?.email!;
	cookies.set("sb-access-token", data?.session?.access_token!, {
		sameSite: "strict",
		path: "/",
		secure: true,
	});
	cookies.set("sb-refresh-token", data?.session?.refresh_token!, {
		sameSite: "strict",
		path: "/",
		secure: true,
	});

	return next();
});
