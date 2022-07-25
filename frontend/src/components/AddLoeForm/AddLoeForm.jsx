import React, { useState } from "react";

const AddLoeForm = ({ createNewLoe }) => {
    const [loeName, setLoeName] = useState();

    function handleSubmit(event) {
        event.preventDefault();
        let newLoe = {
            name: loeName,
        };
        createNewLoe(newLoe);
    }

    return (
        <div>
            <div className="form-group row" >
                <form onSubmit={handleSubmit}>
                    <label className="col-sm-2 col-form-label">Enter Project Name: </label>
                    <input
                        type="text"
                        value={loeName}
                        onChange={(event) => setLoeName(event.target.value)}
                    />
                    <button className="btn btn-primary btn-sm" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddLoeForm;
