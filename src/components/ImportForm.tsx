import React, { Component } from "react";

export class ImportForm extends Component<
   {
      importFormOpen: boolean;
      setImportFormOpen: (value: boolean) => void;
   },
   {}
> {
   constructor(props: {
      importFormOpen: boolean;
      setImportFormOpen: (value: boolean) => void;
   }) {
      super(props);
      this.state = {};
   }

   render() {
      return <div>TEST</div>;
   }
}

export default ImportForm;
