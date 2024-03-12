import React from "react";

function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return <div>Harmony {id}</div>;
}

export default Page;
