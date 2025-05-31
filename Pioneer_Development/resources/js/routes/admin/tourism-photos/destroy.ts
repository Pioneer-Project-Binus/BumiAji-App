import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\TourismPhotoController::destroy
 * @see app\Http\Controllers\TourismPhotoController.php:168
 * @route /admin/tourism-photos/{slug}
 */
export const destroy = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '\/admin\/tourism-photos\/{slug}',
}

/**
 * @see \App\Http\Controllers\TourismPhotoController::destroy
 * @see app\Http\Controllers\TourismPhotoController.php:168
 * @route /admin/tourism-photos/{slug}
 */
destroy.url = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return destroy.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\TourismPhotoController::destroy
 * @see app\Http\Controllers\TourismPhotoController.php:168
 * @route /admin/tourism-photos/{slug}
 */
destroy.delete = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})


export default destroy