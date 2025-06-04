import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see routes/contact.php:8
 * @route '/hubungi-kami'
 */
export const form = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: form.url(options),
    method: 'get',
})

form.definition = {
    methods: ['get','head'],
    url: '/hubungi-kami',
}

/**
 * @see routes/contact.php:8
 * @route '/hubungi-kami'
 */
form.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return form.definition.url + queryParams(options)
}

/**
 * @see routes/contact.php:8
 * @route '/hubungi-kami'
 */
form.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: form.url(options),
    method: 'get',
})
/**
 * @see routes/contact.php:8
 * @route '/hubungi-kami'
 */
form.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: form.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ContactController::store
 * @see app/Http/Controllers/ContactController.php:45
 * @route '/hubungi-kami'
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
    url: '/hubungi-kami',
}

/**
* @see \App\Http\Controllers\ContactController::store
 * @see app/Http/Controllers/ContactController.php:45
 * @route '/hubungi-kami'
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ContactController::store
 * @see app/Http/Controllers/ContactController.php:45
 * @route '/hubungi-kami'
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})
const contact = {
    form,
store,
}

export default contact