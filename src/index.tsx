import { useEffect, useState } from "react";
import faunadb from "faunadb";
const { query: q } = faunadb;

const STATUS = {
  NOT_LOADED: "not-loaded",
  LOADING: "loading",
  LOADED: "loaded",
  ERROR: "error",
};

interface Ref {
  id: string;
}

interface Document {
  ref: Ref;
  ts: number;
  data: object;
}

export function useDatabase(faunaKey: string) {
  return new faunadb.Client({ secret: faunaKey });
}

export function useGetDocument(
  db: faunadb.Client,
  collectionName: string,
  refId: string
): object {
  const [status, setStatus] = useState(STATUS.NOT_LOADED);
  const [document, setDocument] = useState<null | Document>(null);

  useEffect(() => {
    const request = db.query(q.Get(q.Ref(q.Collection(collectionName), refId)));

    request
      .then(async (res) => {
        setStatus(STATUS.LOADING);
        setDocument(await res);
      })
      .then(() => {
        setStatus(STATUS.LOADED);
      })
      .catch((err) => {
        console.error(`[fauna-hooks] ${err}`);
        setStatus(STATUS.ERROR);
      });
  }, []);
  return [document, status];
}
