export const INTRO_SEEN_KEY = "sw-intro-seen";

/**
 * Runs before first paint (inlined in <head>). Adds `skip-intro` to <html> when the intro
 * animation shouldn't play: any page other than home, a repeat visit this session, or reduced motion.
 * CSS keyed on that class hides the loader and shows content without a flash.
 */
export const introScript = `(function(){try{var d=document.documentElement;if(location.pathname!=="/"||sessionStorage.getItem("${INTRO_SEEN_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("skip-intro")}}catch(e){document.documentElement.classList.add("skip-intro")}})();`;
