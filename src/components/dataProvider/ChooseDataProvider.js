import React, { useEffect, useState } from "react";

const ChooseDataProvider = () => {
    const [is_local_storage_provider, setLocalStorageProvider] = useState(null);

    const handleOnChangeRadioButton = (e) => {
        if (e.target.value === 'local_storage') {
            localStorage.setItem('is_local_storage_provider', '1')
            setLocalStorageProvider(true);
            window.location.reload();

        } else {
            localStorage.setItem('is_local_storage_provider', '')
            setLocalStorageProvider(false)
            window.location.reload();
        }
    }

    useEffect(() => {
        const is_local_storage_provider = localStorage.getItem('is_local_storage_provider')
        if (is_local_storage_provider) setLocalStorageProvider(true)
    }, [])

    return (
        <div>
            <h2>Choose data provider</h2>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="choose_provider" id="firebase_checkbox"
                       value="firebase" onChange={handleOnChangeRadioButton}
                       checked={!is_local_storage_provider ? true : false } />
                <label className="form-check-label" htmlFor="firebase_checkbox">Firebase</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="choose_provider" id="local_storage_checkbox"
                       value="local_storage" onChange={handleOnChangeRadioButton}
                       checked={is_local_storage_provider ? true : false} />
                <label className="form-check-label" htmlFor="local_storage_checkbox">Local storage</label>
            </div>
        </div>
    )
}

export default ChooseDataProvider;
