import { createContext, useState } from "react";

interface Context {
    reload: boolean,
    update: () => void;
}

export const ReloadContext = createContext<Context>({
    reload: false,
    update: () => {}
});

export default function useReload() {
    const [reload, setReload] = useState<boolean>(false);

    const update = () => {
        setReload(!reload);
    }

    return {reload, ReloadContext, update};
};