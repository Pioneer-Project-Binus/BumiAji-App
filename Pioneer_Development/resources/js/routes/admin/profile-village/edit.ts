import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\ProfileVillageController::edit
 * @see app\Http\Controllers\ProfileVillageController.php:22
 * @route /admin/profile-village/edit
 */
export const edit = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '\/admin\/profile-village\/edit',
}

/**
 * @see \App\Http\Controllers\ProfileVillageController::edit
 * @see app\Http\Controllers\ProfileVillageController.php:22
 * @route /admin/profile-village/edit
 */
edit.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return edit.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ProfileVillageController::edit
 * @see app\Http\Controllers\ProfileVillageController.php:22
 * @route /admin/profile-village/edit
 */
edit.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\ProfileVillageController::edit
 * @see app\Http\Controllers\ProfileVillageController.php:22
 * @route /admin/profile-village/edit
 */
edit.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(options),
    method: 'head',
})


export default edit