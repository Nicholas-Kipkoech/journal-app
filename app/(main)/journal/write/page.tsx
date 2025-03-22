"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";
import CollectionForm from "@/components/collection-form";
import { getMoodById, MOODS } from "@/app/lib/moods";
import { createCollection, getCollections } from "@/app/services/collections";
import {
  createJournalEntry,
  getJournalEntry,
  updateJournalEntry,
} from "@/app/services/journal";
import useFetch from "@/app/hooks/use-fetch";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function JournalEntryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch Hooks
  const {
    loading: collectionsLoading,
    data: collections,
    fn: fetchCollections,
  } = useFetch(getCollections);

  const {
    loading: entryLoading,
    data: existingEntry,
    fn: fetchEntry,
  } = useFetch(getJournalEntry);

  const {
    loading: actionLoading,
    fn: actionFn,
    data: actionResult,
  } = useFetch(isEditMode ? updateJournalEntry : createJournalEntry);

  const {
    loading: createCollectionLoading,
    fn: createCollectionFn,
    data: createdCollection,
  } = useFetch(createCollection);

  // Load collections and existing entry if editing
  useEffect(() => {
    fetchCollections();
    if (editId) {
      setIsEditMode(true);
      fetchEntry(editId);
    } else {
      setIsEditMode(false);
    }
  }, [editId]);

  // Populate form fields when fetching an existing entry
  useEffect(() => {
    if (isEditMode && existingEntry) {
      setTitle(existingEntry.title || "");
      setContent(existingEntry.content || "");
      setMood(existingEntry.mood || "");
      setCollectionId(existingEntry.collectionId || "");
    }
  }, [isEditMode, existingEntry]);

  // Handle new collection creation
  useEffect(() => {
    if (createdCollection) {
      setIsCollectionDialogOpen(false);
      fetchCollections();
      setCollectionId(createdCollection.id);
      toast.success(`Collection ${createdCollection.name} created!`);
    }
  }, [createdCollection]);

  // Handle successful form submission
  useEffect(() => {
    if (actionResult && !actionLoading) {
      router.push(
        `/collection/${
          actionResult.collectionId ? actionResult.collectionId : "unorganized"
        }`
      );
      toast.success(
        `Entry ${isEditMode ? "updated" : "created"} successfully!`
      );
    }
  }, [actionResult, actionLoading]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const moodData = getMoodById(mood);
      actionFn({
        title,
        content,
        mood,
        collectionId,
        moodScore: moodData?.score,
        moodQuery: moodData?.pixabayQuery,
        ...(isEditMode && { id: editId }),
      });
    },
    [title, content, mood, collectionId, isEditMode, editId]
  );

  const handleCreateCollection = async (data) => {
    createCollectionFn(data.name, data.description || "");
  };

  const isLoading = collectionsLoading || entryLoading || actionLoading;

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="space-y-2 mx-auto">
        <h1 className="text-5xl md:text-6xl gradient-title">
          {isEditMode ? "Edit Entry" : "What's on your mind?"}
        </h1>

        {isLoading && (
          <BarLoader className="mb-4" width={"100%"} color="orange" />
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            disabled={isLoading}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your entry a title..."
            className="py-5 md:text-md"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">How are you feeling?</label>
          <Select value={mood} onValueChange={setMood}>
            <SelectTrigger>
              <SelectValue placeholder="Select a mood..." />
            </SelectTrigger>
            <SelectContent>
              {Object.values(MOODS).map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  <span className="flex items-center gap-2">
                    {m.emoji} {m.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            {getMoodById(mood)?.prompt ?? "Write your thoughts..."}
          </label>
          <ReactQuill
            readOnly={isLoading}
            theme="snow"
            value={content}
            onChange={setContent}
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["blockquote", "code-block"],
                ["link"],
                ["clean"],
              ],
            }}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Add to Collection (Optional)
          </label>
          <Select
            value={collectionId}
            onValueChange={(value) => {
              if (value === "new") setIsCollectionDialogOpen(true);
              else setCollectionId(value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose a collection..." />
            </SelectTrigger>
            <SelectContent>
              {collections?.map((collection) => (
                <SelectItem key={collection.id} value={collection.id}>
                  {collection.name}
                </SelectItem>
              ))}
              <SelectItem value="new">
                <span className="text-orange-600">+ Create New Collection</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-x-4 flex">
          <Button type="submit" variant="journal" disabled={actionLoading}>
            {actionLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditMode ? "Update" : "Publish"}
          </Button>
          {isEditMode && (
            <Button
              onClick={() => router.push(`/journal/${existingEntry.id}`)}
              variant="destructive"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>

      <CollectionForm
        loading={createCollectionLoading}
        onSuccess={handleCreateCollection}
        open={isCollectionDialogOpen}
        setOpen={setIsCollectionDialogOpen}
      />
    </div>
  );
}
