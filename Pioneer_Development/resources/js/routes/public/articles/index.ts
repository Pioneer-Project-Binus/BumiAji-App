import show from './show'
import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\ArticleController::index
 * @see app\Http\Controllers\ArticleController.php:18
 * @route /artikel
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
    url: '\/artikel',
}

/**
 * @see \App\Http\Controllers\ArticleController::index
 * @see app\Http\Controllers\ArticleController.php:18
 * @route /artikel
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ArticleController::index
 * @see app\Http\Controllers\ArticleController.php:18
 * @route /artikel
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\ArticleController::index
 * @see app\Http\Controllers\ArticleController.php:18
 * @route /artikel
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})




const articles = {
    index, 
    show,
}

export default articles