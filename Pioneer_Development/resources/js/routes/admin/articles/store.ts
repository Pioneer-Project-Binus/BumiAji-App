import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\ArticleController::store
 * @see app\Http\Controllers\ArticleController.php:73
 * @route /admin/articles
 */
export const store = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '\/admin\/articles',
}

/**
 * @see \App\Http\Controllers\ArticleController::store
 * @see app\Http\Controllers\ArticleController.php:73
 * @route /admin/articles
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ArticleController::store
 * @see app\Http\Controllers\ArticleController.php:73
 * @route /admin/articles
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


export default store