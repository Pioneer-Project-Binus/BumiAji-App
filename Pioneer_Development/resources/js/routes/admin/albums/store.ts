import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\AlbumController::store
 * @see app\Http\Controllers\AlbumController.php:52
 * @route /admin/albums
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
    url: '\/admin\/albums',
}

/**
 * @see \App\Http\Controllers\AlbumController::store
 * @see app\Http\Controllers\AlbumController.php:52
 * @route /admin/albums
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\AlbumController::store
 * @see app\Http\Controllers\AlbumController.php:52
 * @route /admin/albums
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


export default store