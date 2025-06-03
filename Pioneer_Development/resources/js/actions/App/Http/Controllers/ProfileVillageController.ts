import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\ProfileVillageController::showOrCreate3148c26f1d3319acf6a7ea96e14f87b1
 * @see app\Http\Controllers\ProfileVillageController.php:22
 * @route /profil-desa
 */
const showOrCreate3148c26f1d3319acf6a7ea96e14f87b1 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showOrCreate3148c26f1d3319acf6a7ea96e14f87b1.url(options),
    method: 'get',
})

showOrCreate3148c26f1d3319acf6a7ea96e14f87b1.definition = {
    methods: ['get','head'],
    url: '\/profil-desa',
}

/**
 * @see \App\Http\Controllers\ProfileVillageController::showOrCreate3148c26f1d3319acf6a7ea96e14f87b1
 * @see app\Http\Controllers\ProfileVillageController.php:22
 * @route /profil-desa
 */
showOrCreate3148c26f1d3319acf6a7ea96e14f87b1.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return showOrCreate3148c26f1d3319acf6a7ea96e14f87b1.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ProfileVillageController::showOrCreate3148c26f1d3319acf6a7ea96e14f87b1
 * @see app\Http\Controllers\ProfileVillageController.php:22
 * @route /profil-desa
 */
showOrCreate3148c26f1d3319acf6a7ea96e14f87b1.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showOrCreate3148c26f1d3319acf6a7ea96e14f87b1.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\ProfileVillageController::showOrCreate3148c26f1d3319acf6a7ea96e14f87b1
 * @see app\Http\Controllers\ProfileVillageController.php:22
 * @route /profil-desa
 */
showOrCreate3148c26f1d3319acf6a7ea96e14f87b1.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showOrCreate3148c26f1d3319acf6a7ea96e14f87b1.url(options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\ProfileVillageController::showOrCreate57182bab279dc601d02c468d5615000d
 * @see app\Http\Controllers\ProfileVillageController.php:22
 * @route /admin/profile-village/edit
 */
const showOrCreate57182bab279dc601d02c468d5615000d = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showOrCreate57182bab279dc601d02c468d5615000d.url(options),
    method: 'get',
})

showOrCreate57182bab279dc601d02c468d5615000d.definition = {
    methods: ['get','head'],
    url: '\/admin\/profile-village\/edit',
}

/**
 * @see \App\Http\Controllers\ProfileVillageController::showOrCreate57182bab279dc601d02c468d5615000d
 * @see app\Http\Controllers\ProfileVillageController.php:22
 * @route /admin/profile-village/edit
 */
showOrCreate57182bab279dc601d02c468d5615000d.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return showOrCreate57182bab279dc601d02c468d5615000d.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ProfileVillageController::showOrCreate57182bab279dc601d02c468d5615000d
 * @see app\Http\Controllers\ProfileVillageController.php:22
 * @route /admin/profile-village/edit
 */
showOrCreate57182bab279dc601d02c468d5615000d.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showOrCreate57182bab279dc601d02c468d5615000d.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\ProfileVillageController::showOrCreate57182bab279dc601d02c468d5615000d
 * @see app\Http\Controllers\ProfileVillageController.php:22
 * @route /admin/profile-village/edit
 */
showOrCreate57182bab279dc601d02c468d5615000d.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showOrCreate57182bab279dc601d02c468d5615000d.url(options),
    method: 'head',
})

export const showOrCreate = {
    '\/profil-desa': showOrCreate3148c26f1d3319acf6a7ea96e14f87b1,
    '\/admin\/profile-village\/edit': showOrCreate57182bab279dc601d02c468d5615000d,
}


/**
 * @see \App\Http\Controllers\ProfileVillageController::storeOrUpdate
 * @see app\Http\Controllers\ProfileVillageController.php:44
 * @route /admin/profile-village
 */
export const storeOrUpdate = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: storeOrUpdate.url(options),
    method: 'post',
})

storeOrUpdate.definition = {
    methods: ['post'],
    url: '\/admin\/profile-village',
}

/**
 * @see \App\Http\Controllers\ProfileVillageController::storeOrUpdate
 * @see app\Http\Controllers\ProfileVillageController.php:44
 * @route /admin/profile-village
 */
storeOrUpdate.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return storeOrUpdate.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\ProfileVillageController::storeOrUpdate
 * @see app\Http\Controllers\ProfileVillageController.php:44
 * @route /admin/profile-village
 */
storeOrUpdate.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: storeOrUpdate.url(options),
    method: 'post',
})


const ProfileVillageController = { showOrCreate, storeOrUpdate }

export default ProfileVillageController