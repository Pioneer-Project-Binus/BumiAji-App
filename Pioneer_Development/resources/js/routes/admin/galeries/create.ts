import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\GaleryController::create
 * @see app\Http\Controllers\GaleryController.php:57
 * @route /admin/galeries/create
 */
export const create = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ['get','head'],
    url: '\/admin\/galeries\/create',
}

/**
 * @see \App\Http\Controllers\GaleryController::create
 * @see app\Http\Controllers\GaleryController.php:57
 * @route /admin/galeries/create
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\GaleryController::create
 * @see app\Http\Controllers\GaleryController.php:57
 * @route /admin/galeries/create
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\GaleryController::create
 * @see app\Http\Controllers\GaleryController.php:57
 * @route /admin/galeries/create
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})


export default create