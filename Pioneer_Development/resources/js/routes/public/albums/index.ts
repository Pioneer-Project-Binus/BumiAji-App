import show from './show'
import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\AlbumController::index
 * @see app\Http\Controllers\AlbumController.php:15
 * @route /album-galeri
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
    url: '\/album-galeri',
}

/**
 * @see \App\Http\Controllers\AlbumController::index
 * @see app\Http\Controllers\AlbumController.php:15
 * @route /album-galeri
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\AlbumController::index
 * @see app\Http\Controllers\AlbumController.php:15
 * @route /album-galeri
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\AlbumController::index
 * @see app\Http\Controllers\AlbumController.php:15
 * @route /album-galeri
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})




const albums = {
    index, 
    show,
}

export default albums