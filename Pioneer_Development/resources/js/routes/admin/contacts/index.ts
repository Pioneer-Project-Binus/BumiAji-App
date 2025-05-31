import show from './show'
import destroy from './destroy'
import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\ContactController::index
 * @see app\Http\Controllers\ContactController.php:15
 * @route /admin/contacts
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
    url: '\/admin\/contacts',
}

/**
 * @see \App\Http\Controllers\ContactController::index
 * @see app\Http\Controllers\ContactController.php:15
 * @route /admin/contacts
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ContactController::index
 * @see app\Http\Controllers\ContactController.php:15
 * @route /admin/contacts
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\ContactController::index
 * @see app\Http\Controllers\ContactController.php:15
 * @route /admin/contacts
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})




const contacts = {
    index, 
    show, 
    destroy,
}

export default contacts