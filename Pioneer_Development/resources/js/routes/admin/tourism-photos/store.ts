import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\TourismPhotoController::store
 * @see app\Http\Controllers\TourismPhotoController.php:66
 * @route /admin/tourism-photos
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
    url: '\/admin\/tourism-photos',
}

/**
 * @see \App\Http\Controllers\TourismPhotoController::store
 * @see app\Http\Controllers\TourismPhotoController.php:66
 * @route /admin/tourism-photos
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\TourismPhotoController::store
 * @see app\Http\Controllers\TourismPhotoController.php:66
 * @route /admin/tourism-photos
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


export default store