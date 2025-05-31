import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\TourismPhotoController::edit
 * @see app\Http\Controllers\TourismPhotoController.php:110
 * @route /admin/tourism-photos/{slug}/edit
 */
export const edit = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '\/admin\/tourism-photos\/{slug}\/edit',
}

/**
 * @see \App\Http\Controllers\TourismPhotoController::edit
 * @see app\Http\Controllers\TourismPhotoController.php:110
 * @route /admin/tourism-photos/{slug}/edit
 */
edit.url = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    if (Array.isArray(args)) {
        args = {
            slug: args[0],
        }
    }

    const parsedArgs = {
        slug: args.slug,
    }

    return edit.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\TourismPhotoController::edit
 * @see app\Http\Controllers\TourismPhotoController.php:110
 * @route /admin/tourism-photos/{slug}/edit
 */
edit.get = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\TourismPhotoController::edit
 * @see app\Http\Controllers\TourismPhotoController.php:110
 * @route /admin/tourism-photos/{slug}/edit
 */
edit.head = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})


export default edit