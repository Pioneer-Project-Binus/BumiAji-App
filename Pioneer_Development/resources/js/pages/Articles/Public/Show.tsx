import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Share2, Calendar, User, Tag } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from '@/lib/utils';
import type { PageProps } from '@/types/props-articles';
import type { FontSize } from '@/types/types-articles';
import { FontSizeController } from '@/components/font-size';
import { ArticlesPagination } from '@/components/articles-pagination';
import { PopularBar } from '@/components/popular-bar';
import { RelatedBar } from '@/components/related-bar';
import { splitContentIntoPages, formatContent } from '@/utils/split-content';
import { formatDate } from '@/utils/format-date';
import { shareArticle } from '@/utils/share';
import articleRoute from '@/routes/articles';

const ArticleDetail: React.FC = () => {
  const { article, popularArticles, relatedArticles } = usePage<PageProps>().props;
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [fontClass, setFontClass] = useState<string>('text-base');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [contentPages, setContentPages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (article && article.content) {
      const pages = splitContentIntoPages(article.content, 500);
      setContentPages(pages);
      setIsLoading(false);
    }
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Artikel Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-4">Artikel yang Anda cari tidak tersedia.</p>
          <Link
            href={articleRoute.indexPublic().url}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Daftar Artikel
          </Link>
        </div>
      </div>
    );
  }

  const handleFontSizeChange = (size: string, className: string): void => {
    setFontSize(size as FontSize);
    setFontClass(className);
  };

  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= contentPages.length) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleShare = async (): Promise<void> => {
    await shareArticle(article.title, window.location.href);
  };

  const currentContent = contentPages[currentPage - 1] || article.content;
  const formattedContent = formatContent(currentContent);

  const getFeaturedImageUrl = (imagePath?: string): string => {
    if (!imagePath) return '';
    return imagePath.startsWith('/storage') ? imagePath : `/storage/${imagePath}`;
  };

  const popularBarItems = (popularArticles && popularArticles.length > 0)
    ? popularArticles.map((a, idx) => ({ id: idx + 1, title: a.title, slug: a.slug }))
    : undefined;

  const relatedBarItems = (relatedArticles && relatedArticles.length > 0)
    ? relatedArticles.map((a, idx) => ({ id: idx + 1, title: a.title, slug: a.slug }))
    : undefined;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat artikel...</p>
        </div>
      </div>
    );
  }

  const imageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>{article?.title ? article.title + " | Desa Wisata Bumi Aji" : "Desa Wisata Bumi Aji"}</title>
        <meta name="robots" content="index, follow" />
        <meta name="description" content={article?.content ? article.content.slice(0, 150).replace(/<[^>]+>/g, '') + '...' : "Desa Wisata Bumi Aji adalah destinasi wisata alam dan budaya terbaik di Kota Batu. Temukan keindahan alam, kuliner, dan pengalaman tak terlupakan di sini."} />
        <meta name="keywords" content="Desa Wisata, Bumi Aji, Wisata Batu, Wisata Alam, Wisata Budaya, Desa Wisata Bumi Aji, Kota Batu, Pariwisata" />
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/AMAZING.png" />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article?.title ? article.title + " | Desa Wisata Bumi Aji" : "Desa Wisata Bumi Aji"} />
        <meta property="og:description" content={article?.content ? article.content.slice(0, 150).replace(/<[^>]+>/g, '') + '...' : "Desa Wisata Bumi Aji adalah destinasi wisata alam dan budaya terbaik di Kota Batu."} />
        <meta property="og:image" content={article?.featuredImage ? (article.featuredImage.startsWith('/storage') ? article.featuredImage : `/storage/${article.featuredImage}`) : "/AMAZING.png"} />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ""} />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article?.title ? article.title + " | Desa Wisata Bumi Aji" : "Desa Wisata Bumi Aji"} />
        <meta name="twitter:description" content={article?.content ? article.content.slice(0, 150).replace(/<[^>]+>/g, '') + '...' : "Desa Wisata Bumi Aji adalah destinasi wisata alam dan budaya terbaik di Kota Batu."} />
        <meta name="twitter:image" content={article?.featuredImage ? (article.featuredImage.startsWith('/storage') ? article.featuredImage : `/storage/${article.featuredImage}`) : "/AMAZING.png"} />
      </Head>
      <div className="min-h-screen bg-gray-50 relative font-poppins">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <Link
            href={articleRoute.indexPublic().url}
            className="hidden lg:flex items-center text-gray-600 hover:text-gray-800 transition-colors absolute left-8 top-12 z-20"
          >
            <motion.div
              whileHover={{ color: '#14532d' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <ArrowLeft size={28} />
            </motion.div>
          </Link>
        </motion.div>
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-10 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Content */}
            <motion.div
              className="lg:col-span-9"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <div className="mb-4">
                {/* Title */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-2">
                  {article.title}
                </h1>
                {/* Metadata */}
                <div className="flex flex-nowrap items-center space-x-4 text-xs sm:text-sm text-gray-600 mt-4 mb-5 overflow-x-auto">
                  {article.author && (
                    <div className="flex items-center space-x-2">
                      <User size={16} />
                      <span className="font-medium whitespace-nowrap">{article.author.name}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span className="whitespace-nowrap">{formatDate(article.createdAt)}</span>
                  </div>
                  {article.category && (
                    <div className="hidden md:flex items-center space-x-2">
                      <Tag size={16} />
                      <span>{article.category.name}</span>
                    </div>
                  )}
                  <motion.button
                    onClick={handleShare}
                    className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-green-800 transition-colors ml-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Share2 size={16} />
                    <span className="xs:inline">Bagikan Artikel</span>
                  </motion.button>
                </div>
                {/* Featured Image */}
                {article.featuredImage && (
                  <motion.div
                    variants={imageVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <img
                      src={getFeaturedImageUrl(article.featuredImage)}
                      alt={article.title}
                      className="w-full h-64 md:h-80 lg:h-96 object-cover shadow-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <div className="flex justify-end mt-5">
                      <FontSizeController
                        fontSize={fontSize}
                        onFontSizeChange={handleFontSizeChange}
                      />
                    </div>
                  </motion.div>
                )}
              </div>
              {/* Article Content */}
              <motion.div
                className="prose prose-lg max-w-none"
                variants={contentVariants}
                initial="initial"
                animate="animate"
              >
                <div
                  className={`${fontClass} leading-relaxed text-gray-800 prose-p:mb-4 prose-p:text-justify prose-headings:text-gray-900 prose-headings:font-bold prose-strong:text-gray-900 prose-em:italic`}
                  dangerouslySetInnerHTML={{
                    __html: formattedContent
                  }}
                  style={{
                    lineHeight: '1.8',
                    textAlign: 'justify'
                  }}
                />
              </motion.div>
              {/* Pagination */}
              <AnimatePresence mode="wait">
                <ArticlesPagination
                  key={currentPage}
                  currentPage={currentPage}
                  totalPages={contentPages.length}
                  onPageChange={handlePageChange}
                />
              </AnimatePresence>
            </motion.div>
            {/* Sidebar */}
            <motion.div
              className="lg:col-span-3 hidden lg:block"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <PopularBar items={popularBarItems} />
              <div className="mt-8">
                <RelatedBar items={relatedBarItems} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleDetail;