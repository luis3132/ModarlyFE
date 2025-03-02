import { createContext, useState } from "react";

interface Context {
    reload: boolean,
    loading: boolean,
    update: () => void;
    loadingUpdate: (value: boolean) => void;
}

export const ReloadContext = createContext<Context>({
    reload: false,
    loading: false,
    update: () => {},
    loadingUpdate: () => {}
});

export default function useReload() {
    const [reload, setReload] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const update = () => {
        setReload(!reload);
    }

    const loadingUpdate = (value: boolean) => {
        setLoading(value);
    }

    return {reload, ReloadContext, update, loadingUpdate, loading};
};