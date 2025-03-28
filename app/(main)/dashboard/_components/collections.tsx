"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import CollectionForm from "@/components/collection-form";
import useFetch from "@/app/hooks/use-fetch";
import { createCollection, getCollections } from "@/app/services/collections";
import CollectionPreview from "./collection-preview";

interface Collection {
  id: string;
  name: string;
  description: string;
}

interface Entry {
  id: string;
  title: string;
  createdAt: string;
  content: string;
}

interface CollectionProps {
  collections: Collection[] | null;
  entriesByCollection?: Record<string, Entry[]>;
}

const Collections: React.FC<CollectionProps> = ({
  collections,
  entriesByCollection = {},
}) => {
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);

  const {
    loading: createCollectionLoading,
    fn: createCollectionFn,
    data: createdCollection,
  } = useFetch(createCollection);

  const { fn: fetchCollections, data: updatedCollections } =
    useFetch(getCollections);

  useEffect(() => {
    if (createdCollection) {
      setIsCollectionDialogOpen(false);
      toast.success(`Collection  created!`);
      fetchCollections(); // always fetch collections when it is created
    }
  }, [createdCollection]);

  const handleCreateCollection = async (data: Collection) => {
    createCollectionFn({ name: data.name, description: data.description });
  };

  // if (!collections || collections.length === 0) return null;
  const displayedCollections = updatedCollections ?? collections; // updated new fetched collections

  return (
    <section id="collections" className="space-y-6">
      <h2 className="text-3xl font-bold gradient-title">Collections</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Create New Collection Button */}
        <CollectionPreview
          isCreateNew={true}
          onCreateNew={() => setIsCollectionDialogOpen(true)}
        />

        {/* Unorganized Collection */}
        {entriesByCollection?.unorganized && (
          <CollectionPreview
            name="Unorganized"
            entries={entriesByCollection.unorganized}
            isUnorganized={true}
          />
        )}

        {/* User Collections */}
        {displayedCollections?.map((collection) => (
          <CollectionPreview
            key={collection.id}
            id={collection.id}
            name={collection.name}
            entries={entriesByCollection?.[collection?.id] || []} // ✅ Safe access
          />
        ))}

        <CollectionForm
          loading={createCollectionLoading}
          onSuccess={handleCreateCollection}
          open={isCollectionDialogOpen}
          setOpen={setIsCollectionDialogOpen}
        />
      </div>
    </section>
  );
};

export default Collections;
