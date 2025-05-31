import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\TestimonialController::store
 * @see app\Http\Controllers\TestimonialController.php:72
 * @route /admin/testimonials
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
    url: '\/admin\/testimonials',
}

/**
 * @see \App\Http\Controllers\TestimonialController::store
 * @see app\Http\Controllers\TestimonialController.php:72
 * @route /admin/testimonials
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\TestimonialController::store
 * @see app\Http\Controllers\TestimonialController.php:72
 * @route /admin/testimonials
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})


export default store