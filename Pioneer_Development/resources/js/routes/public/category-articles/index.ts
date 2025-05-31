import show from './show'
import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\CategoryArticleController::index
 * @see app\Http\Controllers\CategoryArticleController.php:14
 * @route /kategori-artikel
 */
export const index = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ['get','head'],
    url: '\/kategori-artikel',
}

/**
 * @see \App\Http\Controllers\CategoryArticleController::index
 * @see app\Http\Controllers\CategoryArticleController.php:14
 * @route /kategori-artikel
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CategoryArticleController::index
 * @see app\Http\Controllers\CategoryArticleController.php:14
 * @route /kategori-artikel
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\CategoryArticleController::index
 * @see app\Http\Controllers\CategoryArticleController.php:14
 * @route /kategori-artikel
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})




const categoryArticles = {
    index, 
    show,
}

export default categoryArticles