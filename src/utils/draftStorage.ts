export const saveDraft = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getDraft = (key: string) => {
    const draft = localStorage.getItem(key);
    return draft ? JSON.parse(draft) : null;
};

export const clearDraft = (key: string) => {
    localStorage.removeItem(key);
};
