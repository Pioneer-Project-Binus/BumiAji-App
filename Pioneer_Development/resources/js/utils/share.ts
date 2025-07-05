export const shareArticle = async (title: string, url: string): Promise<void> => {
  const shareData = {
    title: title,
    text: `Baca artikel menarik: ${title}`,
    url: url
  };
  try {
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(url);
      alert('Link artikel berhasil disalin ke clipboard!');
    }
  } catch (error) {
    console.error('Error sharing:', error);
    try {
      await navigator.clipboard.writeText(url);
      alert('Link artikel berhasil disalin ke clipboard!');
    } catch (clipboardError) {
      console.error('Error copying to clipboard:', clipboardError);
    }
  }
}; 