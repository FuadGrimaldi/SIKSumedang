"use client";
import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import { Article } from "@/types/article";

interface ArticleDetailProps {
  title: string;
}

const DetailArticle = ({ title }: ArticleDetailProps) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchArticle = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/articles/detail/${title}`);
      const data = await res.json();
      console.log("Fetched article data:", data);

      if (data.error) {
        setError(data.error);
      } else {
        setArticle(data);
        // Fetch related articles from same desa
      }
    } catch (error) {
      console.error("Error fetching article:", error);
      setError("Gagal memuat artikel");
    } finally {
      setLoading(false);
    }
  }, [title]);
  useEffect(() => {
    if (title) {
      fetchArticle();
    }
  }, [title, fetchArticle]);
  console.log("Article detail component title:", article);
  return <div>DetailArticle</div>;
};

export default DetailArticle;
