import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\CategoryArticleController::store
 * @see app\Http\Controllers\CategoryArticleController.php:52
 * @route /admin/category-articles
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
    url: '\/admin\/category-articles',
}

/**
 * @see \App\Http\Controllers\CategoryArticleController::store
 * @see app\Http\Controllers\CategoryArticleController.php:52
 * @route /admin/category-articles
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\CategoryArticleController::store
 * @see app\Http\Controllers\CategoryArticleController.php:52
 * @route /admin/category-articles
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


export default store