import React from "react";

const AddExpenseForm = () => {
  return (
    <form>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required={true}
            type="text"
            className="form-control"
            id="name"
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required={true}
            type="text"
            className="form-control"
            id="cost"
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="date">Date</label>
          <input
            required={true}
            type="date" 
            defaultValue="2022-11-21"
            className="form-control"
            id="date"
          ></input>
        </div>
      </div>
      <div className="row">
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
