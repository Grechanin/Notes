export const properComponentToDataProvider = (firebase_data_component, local_data_component) => {
    const is_local_storage_provider = localStorage.getItem('is_local_storage_provider');
    if (is_local_storage_provider) {
        // const wrapper = (props) => {
        //     const new_props = {...props, is_local_storage_provider};
        //     console.log('type', typeof(local_data_component))
        //     return local_data_component(new_props);
        // }
        // return wrapper
        // console.log('local_data_component',local_data_component)
        return local_data_component
    } else {
        return firebase_data_component
    }

}