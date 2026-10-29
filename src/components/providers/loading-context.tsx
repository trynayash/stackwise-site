"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { INTRO_SEEN_KEY } from "@/lib/intro";

type LoadingContextType = {
    isLoading: boolean;
    setLoadingDone: () => void;
};

const LoadingContext = createContext<LoadingContextType>({
    isLoading: true,
    setLoadingDone: () => { },
});

export function useLoading() {
    return useContext(LoadingContext);
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    const setLoadingDone = useCallback(() => {
        setIsLoading(false);
        try {
            sessionStorage.setItem(INTRO_SEEN_KEY, "1");
        } catch {
            // Storage can be unavailable (private mode); the intro just plays again next time.
        }
    }, []);

    useEffect(() => {
        if (document.documentElement.classList.contains("skip-intro")) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsLoading(false);
        }
    }, []);

    return (
        <LoadingContext.Provider value={{ isLoading, setLoadingDone }}>
            {children}
        </LoadingContext.Provider>
    );
}
