"use client";
import React, { useState, useEffect, useCallback } from "react";
import Breadcrumb from "../Breadchumb/Breadchumb";
import { motion } from "framer-motion";
import { Article } from "@/types/article";
import CardNews from "../Card/NewsCard";
import { filter } from "framer-motion/m";

interface LayananProps {
  nama_kecamatan?: string;
  kecamatanId?: number;
  // Optional: Initial filters dari props untuk navigasi programmatic
  initialFilters?: {
    desa_id?: number | number[];
    kategori_id?: number | number[];
    sub_kategori_id?: number | number[];
  };
}

interface Desa {
  id: number;
  nama_desa: string;
}

interface Kategori {
  id: number;
  nama: string;
}

interface SubKategori {
  id: number;
  sub_nama: string;
  kategori_id: number;
}

interface FilterState {
  desa_id: number[];
  kategori_id: number[];
  sub_kategori_id: number[];
}

const ITEMS_PER_PAGE = 6;

const ArtikelComp = ({
  nama_kecamatan,
  kecamatanId,
  initialFilters,
}: LayananProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState<string | null>(null);
  // Filter states
  const [filters, setFilters] = useState<FilterState>({
    desa_id: [],
    kategori_id: [],
    sub_kategori_id: [],
  });

  // Options for filters
  const [desaOptions, setDesaOptions] = useState<Desa[]>([]);
  const [kategoriOptions, setKategoriOptions] = useState<Kategori[]>([]);
  const [subKategoriOptions, setSubKategoriOptions] = useState<SubKategori[]>(
    []
  );

  // Loading states for options
  const [loadingDesa, setLoadingDesa] = useState(false);
  const [loadingKategori, setLoadingKategori] = useState(false);
  const [loadingSubKategori, setLoadingSubKategori] = useState(false);

  // Filter panel visibility
  const [showFilters, setShowFilters] = useState(false);
  const [isFilterInitialized, setIsFilterInitialized] = useState(false);

  // Fetch filter options
  const fetchDesaOptions = useCallback(async () => {
    if (!kecamatanId) return;

    setLoadingDesa(true);
    try {
      const res = await fetch(`/api/desa/subdomain/${kecamatanId}`);
      if (res.ok) {
        const data = await res.json();
        setDesaOptions(data || []);
      }
    } catch (err) {
      console.error("Error fetching desa options:", err);
    } finally {
      setLoadingDesa(false);
    }
  }, [kecamatanId]);

  const fetchKategoriOptions = useCallback(async () => {
    if (!kecamatanId) return;

    setLoadingKategori(true);
    try {
      const res = await fetch(
        `/api/articles/kategori/subdomain/${kecamatanId}`
      );
      if (res.ok) {
        const data = await res.json();
        setKategoriOptions(data || []);
      }
    } catch (err) {
      console.error("Error fetching kategori options:", err);
    } finally {
      setLoadingKategori(false);
    }
  }, [kecamatanId]);

  const fetchSubKategoriOptions = useCallback(async (kategoriIds: number[]) => {
    if (kategoriIds.length === 0) {
      setSubKategoriOptions([]);
      return;
    }

    setLoadingSubKategori(true);
    try {
      const promises = kategoriIds.map((id) =>
        fetch(`/api/articles/kategori/sub-kategori/${id}`)
      );

      const responses = await Promise.all(promises);
      const dataPromises = responses.map((res) => (res.ok ? res.json() : []));
      const results = await Promise.all(dataPromises);

      const allSubKategori = results.flat();
      setSubKategoriOptions(allSubKategori || []);
    } catch (err) {
      console.error("Error fetching sub-kategori options:", err);
    } finally {
      setLoadingSubKategori(false);
    }
  }, []);

  // Build query parameters for filtering
  const buildFilterQuery = useCallback(() => {
    const params = new URLSearchParams();

    if (filters.desa_id.length > 0) {
      params.append("desa_id", filters.desa_id.join(","));
    }

    if (filters.kategori_id.length > 0) {
      params.append("kategori_id", filters.kategori_id.join(","));
    }

    if (filters.sub_kategori_id.length > 0) {
      params.append("sub_kategori_id", filters.sub_kategori_id.join(","));
    }

    return params.toString();
  }, [filters]);

  // Fetch articles by kecamatan_id with pagination
  const fetchArticles = useCallback(async () => {
    if (!kecamatanId) return;

    setLoading(true);
    setError(null);
    try {
      const filterQuery = buildFilterQuery();
      const queryString = `page=${currentPage}&limit=${ITEMS_PER_PAGE}${
        filterQuery ? "&" + filterQuery : ""
      }`;

      const res = await fetch(
        `/api/articles/subdomain/${kecamatanId}?${queryString}`
      );
      if (!res.ok) throw new Error("Gagal memuat artikel");

      const data = await res.json();
      const filteredArticles = data.items.filter(
        (article: Article) =>
          article.kategori_id !== 1 &&
          article.kategori_id !== 8 &&
          article.status === "published"
      );
      setArticles(filteredArticles || []);
      setTotalItems(data.total || 0);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Gagal memuat artikel");
      setArticles([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [kecamatanId, currentPage, buildFilterQuery]);

  // Fetch data ketika kecamatanId atau page berubah
  useEffect(() => {
    if (kecamatanId) {
      fetchDesaOptions();
      fetchKategoriOptions();
    }
  }, [kecamatanId, fetchDesaOptions, fetchKategoriOptions]);

  useEffect(() => {
    if (kecamatanId && isFilterInitialized) {
      fetchArticles();
    }
  }, [filters, kecamatanId, currentPage, isFilterInitialized, fetchArticles]);

  // Fetch sub-kategori when kategori selection changes
  useEffect(() => {
    fetchSubKategoriOptions(filters.kategori_id);
  }, [filters.kategori_id, fetchSubKategoriOptions]);

  // Parse initial filters dari URL / props
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsFilterInitialized(true);
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = urlParams.get("page");
      if (pageParam) {
        const pageNum = parseInt(pageParam);
        if (!isNaN(pageNum) && pageNum > 0) {
          setCurrentPage(pageNum);
        }
      }
      const initialFiltersState: FilterState = {
        desa_id: [],
        kategori_id: [],
        sub_kategori_id: [],
      };
      const desaParam = urlParams.get("desa_id");
      if (desaParam) {
        initialFiltersState.desa_id = desaParam
          .split(",")
          .map(Number)
          .filter((n) => !isNaN(n));
      }
      const kategoriParam = urlParams.get("kategori_id");
      if (kategoriParam) {
        initialFiltersState.kategori_id = kategoriParam
          .split(",")
          .map(Number)
          .filter((n) => !isNaN(n));
      }
      const subKategoriParam = urlParams.get("sub_kategori_id");
      if (subKategoriParam) {
        initialFiltersState.sub_kategori_id = subKategoriParam
          .split(",")
          .map(Number)
          .filter((n) => !isNaN(n));
      }
      // Override dari props
      if (initialFilters) {
        if (initialFilters.desa_id) {
          const desaIds = Array.isArray(initialFilters.desa_id)
            ? initialFilters.desa_id
            : [initialFilters.desa_id];
          initialFiltersState.desa_id = desaIds;
        }
        if (initialFilters.kategori_id) {
          const kategoriIds = Array.isArray(initialFilters.kategori_id)
            ? initialFilters.kategori_id
            : [initialFilters.kategori_id];
          initialFiltersState.kategori_id = kategoriIds;
        }
        if (initialFilters.sub_kategori_id) {
          const subKategoriIds = Array.isArray(initialFilters.sub_kategori_id)
            ? initialFilters.sub_kategori_id
            : [initialFilters.sub_kategori_id];
          initialFiltersState.sub_kategori_id = subKategoriIds;
        }
      }
      if (
        initialFiltersState.desa_id.length > 0 ||
        initialFiltersState.kategori_id.length > 0 ||
        initialFiltersState.sub_kategori_id.length > 0
      ) {
        setFilters(initialFiltersState);
      }
    }
  }, [initialFilters]);

  // Function to update URL with page param
  const updateURL = useCallback(
    (page: number, currentFilters?: FilterState) => {
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        const filtersToUse = currentFilters || filters;

        // Page param
        if (page === 1) {
          url.searchParams.delete("page");
        } else {
          url.searchParams.set("page", page.toString());
        }

        // Desa
        if (filtersToUse.desa_id.length > 0) {
          url.searchParams.set("desa_id", filtersToUse.desa_id.join(","));
        } else {
          url.searchParams.delete("desa_id");
        }

        // Kategori
        if (filtersToUse.kategori_id.length > 0) {
          url.searchParams.set(
            "kategori_id",
            filtersToUse.kategori_id.join(",")
          );
        } else {
          url.searchParams.delete("kategori_id");
        }

        // Sub Kategori
        if (filtersToUse.sub_kategori_id.length > 0) {
          url.searchParams.set(
            "sub_kategori_id",
            filtersToUse.sub_kategori_id.join(",")
          );
        } else {
          url.searchParams.delete("sub_kategori_id");
        }

        window.history.pushState({}, "", url.toString());
      }
    },
    [filters]
  );

  // Update URL ketika page berubah
  useEffect(() => {
    updateURL(currentPage);
  }, [currentPage, updateURL, filters]);

  // Handle page change
  const handlePageChange = useCallback(
    (page: number) => {
      const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalItems]
  );

  // Handle filter changes
  const handleFilterChange = useCallback(
    (type: keyof FilterState, value: number, checked: boolean) => {
      setFilters((prev) => {
        const newFilters = { ...prev };

        if (checked) {
          newFilters[type] = [...prev[type], value];
        } else {
          newFilters[type] = prev[type].filter((id) => id !== value);

          // If kategori is unchecked, also uncheck related sub-kategori
          if (type === "kategori_id") {
            newFilters.sub_kategori_id = prev.sub_kategori_id.filter(
              (subId) =>
                !subKategoriOptions.some(
                  (sub) => sub.id === subId && sub.kategori_id === value
                )
            );
          }
        }

        return newFilters;
      });
    },
    [subKategoriOptions]
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      desa_id: [],
      kategori_id: [],
      sub_kategori_id: [],
    });
  }, []);

  // Check if any filters are active
  const hasActiveFilters =
    filters.desa_id.length > 0 ||
    filters.kategori_id.length > 0 ||
    filters.sub_kategori_id.length > 0;

  // Generate page numbers for pagination
  const getPageNumbers = useCallback(() => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const pageNumbers: number[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const end = Math.min(totalPages, start + maxVisiblePages - 1);

      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  }, [totalItems, currentPage]);

  // Calculate pagination values
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  console.log(articles);

  return (
    <div className="relative bg-white">
      {/* Hero Section */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage: 'url("/assets/background/bg-hero-3.jpg")',
          backgroundRepeat: "repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
          height: "450px",
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

        <div className="relative z-10 flex flex-col w-full h-full pt-[100px] px-[31px] lg:px-[100px] py-2 text-white">
          <Breadcrumb
            links={[
              { to: "/", label: "Home" },
              { to: "#", label: "Artikel" },
            ]}
          />
          <div className="relative mb-12">
            <h1 className="text-2xl lg:text-4xl font-bold text-white">
              Artikel
            </h1>
            <p className="text-white text-sm lg:text-lg mt-1 mb-2 font-medium">
              Artikel Kecamatan {nama_kecamatan}
            </p>
            <div className="lg:w-72 w-full h-1 bg-blue-600 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Floating Content */}
      <div className="relative -mt-48 px-[31px] lg:px-[100px] py-2">
        <div className="bg-white rounded-2xl border pb-12 pt-8 px-3 lg:px-8">
          <div className="container mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 text-center">
              Artikel Seputar Wilayah {nama_kecamatan}
            </h2>
            <p className="text-base text-gray-600 mb-8 text-center">
              Berbagai artikel terkini seputar wilayah {nama_kecamatan} dan
              sekitarnya. Mulai dari wisata, budaya, industri kreatif, hingga
              update penting lainnya.
            </p>
            {/* Filter Toggle Button (Mobile) */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 2v-6.586a1 1 0 00-.293-.707L3.293 7.121A1 1 0 013 6.414V4z"
                  />
                </svg>
                Filter Artikel
                {hasActiveFilters && (
                  <span className="ml-2 px-2 py-1 text-xs bg-blue-600 text-white rounded-full">
                    {filters.desa_id.length +
                      filters.kategori_id.length +
                      filters.sub_kategori_id.length}
                  </span>
                )}
              </button>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="flex-1 order-2 lg:order-1">
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="bg-gray-200 rounded-3xl h-40 w-full"></div>
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="flex flex-col justify-center items-center min-h-[300px] space-y-4">
                    <p className="text-red-500">{error}</p>
                    <button
                      onClick={fetchArticles}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Coba Lagi
                    </button>
                  </div>
                ) : articles.length === 0 ? (
                  <div className="text-center py-4">
                    <div className="w-full bg-gray-50 rounded-lg p-8 inline-block">
                      <svg
                        className="w-16 h-16 text-gray-400 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3v8m0 0V9a2 2 0 00-2-2H9m10 13a2 2 0 01-2-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 01-2 2h10z"
                        />
                      </svg>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Belum Ada Artikel
                      </h3>
                      <p className="text-gray-500">
                        Tidak ada artikel yang tersedia untuk filter yang
                        dipilih.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Articles Grid */}
                    <motion.div
                      key={currentPage}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      {articles.map((article) => (
                        <CardNews
                          key={article.id}
                          id={article.id}
                          slug={article.slug}
                          date={article.created_at}
                          CardTitle={article.title}
                          CardDescription={article.content}
                          image={article.featured_image}
                          category={article.kategori_article?.nama}
                        />
                      ))}
                    </motion.div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex flex-col items-center space-y-4 mt-16">
                        <div className="flex items-center justify-center space-x-2 flex-wrap gap-2">
                          {/* Previous Button */}
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                              />
                            </svg>
                            Previous
                          </button>

                          {/* Page Numbers */}
                          <div className="flex space-x-1 flex-wrap gap-1">
                            {getPageNumbers().map((pageNum) => (
                              <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                  currentPage === pageNum
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                                }`}
                              >
                                {pageNum}
                              </button>
                            ))}
                          </div>

                          {/* Next Button */}
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
                          >
                            Next
                            <svg
                              className="w-4 h-4 ml-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Page Info */}
                        {/* Page Info */}
                        <div className="text-sm text-gray-600">
                          Showing {startIndex + 1} to{" "}
                          {Math.min(startIndex + ITEMS_PER_PAGE, totalItems)} of{" "}
                          {totalItems} Artikel
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Decorative */}
                <div className="mt-16 text-center">
                  <div className="inline-flex items-center space-x-2 text-gray-400">
                    <div className="w-8 h-px bg-gray-600"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <div className="w-8 h-px bg-gray-600"></div>
                  </div>
                </div>
              </div>
              {/* Filter Sidebar */}
              <div
                className={`lg:w-80 order-1 lg:order-2 ${
                  showFilters ? "block" : "hidden lg:block"
                }`}
              >
                <div className="bg-gray-50 rounded-xl p-6 sticky top-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Filter Artikel
                    </h3>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Reset
                      </button>
                    )}
                  </div>

                  {/* Desa Filter */}
                  <div className="mb-8">
                    <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Desa
                    </h4>
                    {loadingDesa ? (
                      <div className="space-y-2">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="h-6 bg-gray-200 rounded animate-pulse"
                          ></div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {desaOptions.map((desa) => (
                          <label
                            key={desa.id}
                            className="flex items-center space-x-3 cursor-pointer hover:bg-white rounded-md p-2 transition-colors"
                          >
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                              checked={filters.desa_id.includes(desa.id)}
                              onChange={(e) =>
                                handleFilterChange(
                                  "desa_id",
                                  desa.id,
                                  e.target.checked
                                )
                              }
                            />
                            <span className="text-sm text-gray-600">
                              {desa.nama_desa}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Kategori Filter */}
                  <div className="mb-8">
                    <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      Kategori
                    </h4>
                    {loadingKategori ? (
                      <div className="space-y-2">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="h-6 bg-gray-200 rounded animate-pulse"
                          ></div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {kategoriOptions.map((kategori) => (
                          <label
                            key={kategori.id}
                            className="flex items-center space-x-3 cursor-pointer hover:bg-white rounded-md p-2 transition-colors"
                          >
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                              checked={filters.kategori_id.includes(
                                kategori.id
                              )}
                              onChange={(e) =>
                                handleFilterChange(
                                  "kategori_id",
                                  kategori.id,
                                  e.target.checked
                                )
                              }
                            />
                            <span className="text-sm text-gray-600">
                              {kategori.nama}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Sub-Kategori Filter - Only show if there are selected categories */}
                  {filters.kategori_id.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                        Sub-Kategori
                      </h4>
                      {loadingSubKategori ? (
                        <div className="space-y-2">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="h-6 bg-gray-200 rounded animate-pulse"
                            ></div>
                          ))}
                        </div>
                      ) : subKategoriOptions.length > 0 ? (
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {subKategoriOptions.map((subKategori) => (
                            <label
                              key={subKategori.id}
                              className="flex items-center space-x-3 cursor-pointer hover:bg-white rounded-md p-2 transition-colors"
                            >
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                                checked={filters.sub_kategori_id.includes(
                                  subKategori.id
                                )}
                                onChange={(e) =>
                                  handleFilterChange(
                                    "sub_kategori_id",
                                    subKategori.id,
                                    e.target.checked
                                  )
                                }
                              />
                              <span className="text-sm text-gray-600">
                                {subKategori.sub_nama}
                              </span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">
                          Tidak ada sub-kategori tersedia
                        </p>
                      )}
                    </div>
                  )}

                  {/* Active Filters Summary */}
                  {hasActiveFilters && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                        Filter Aktif
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {filters.desa_id.length > 0 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            {filters.desa_id.length} Desa
                          </span>
                        )}
                        {filters.kategori_id.length > 0 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            {filters.kategori_id.length} Kategori
                          </span>
                        )}
                        {filters.sub_kategori_id.length > 0 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                            {filters.sub_kategori_id.length} Sub-Kategori
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Filter Actions */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{totalItems} artikel ditemukan</span>
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="text-red-600 hover:text-red-700 font-medium"
                        >
                          Hapus Semua
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtikelComp;
