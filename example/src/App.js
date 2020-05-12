import React from "react";

import { useDatabase, useGetDocument, useCreateDocument, useDeleteDocument } from "use-fauna";

const App = () => {
  const db = useDatabase("fnADrW9uexACE1_GWGovu3My4mXWcm-tgQ3Sp3oP");
  console.log(db);
  // const [doc, status] = useGetDocument(db, "orders", "264990427463026195");
  // const [doc, status] = useCreateDocument(db, "products", {
  //   members: ['trey', 'mike', 'paige', 'fish']
  // })
  const [doc, status] = useDeleteDocument(db, "products", "264990427453587987")
  console.log("doc", doc);
  console.log("status", status);
  return <div>App</div>;
};
export default App;
