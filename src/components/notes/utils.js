export const properComponentToDataProvider = (firebase_data_component, local_data_component) => {
    const is_local_storage_provider = localStorage.getItem('is_local_storage_provider');
    if (is_local_storage_provider) {
        return local_data_component
    } else {
        return firebase_data_component
    }

}