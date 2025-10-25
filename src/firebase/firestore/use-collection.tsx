'use client';

import { useEffect, useState, useRef } from 'react';
import {
  onSnapshot,
  query,
  collection,
  where,
  orderBy,
  limit,
  startAfter,
  endBefore,
  limitToLast,
  startAt,
  Query,
  DocumentData,
  FirestoreError,
  QuerySnapshot,
  CollectionReference,
} from 'firebase/firestore';

interface UseCollectionOptions<T> {
  sort?: { by: keyof T; direction: 'asc' | 'desc' };
  filter?: { field: keyof T; operator: '==' | '!=' | '<' | '<=' | '>' | '>='; value: any };
  limit?: number;
}

export function useCollection<T>(
  ref: CollectionReference<T> | Query<T> | null,
  options?: UseCollectionOptions<T>
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    if (!ref) {
      setLoading(false);
      return;
    }

    let q: Query<T> = ref;

    if (optionsRef.current?.filter) {
      const { field, operator, value } = optionsRef.current.filter;
      q = query(q, where(field as string, operator, value));
    }

    if (optionsRef.current?.sort) {
      const { by, direction } = optionsRef.current.sort;
      q = query(q, orderBy(by as string, direction));
    }

    if (optionsRef.current?.limit) {
      q = query(q, limit(optionsRef.current.limit));
    }
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];
        setData(docs);
        setLoading(false);
      },
      (err: FirestoreError) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [ref]);

  return { data, loading, error };
}
