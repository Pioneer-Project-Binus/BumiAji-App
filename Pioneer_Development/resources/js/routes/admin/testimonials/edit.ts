import { queryParams, type QueryParams } from './../../../wayfinder'

/**
 * @see \App\Http\Controllers\TestimonialController::edit
 * @see app\Http\Controllers\TestimonialController.php:146
 * @route /admin/testimonials/{slug}/edit
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
    url: '\/admin\/testimonials\/{slug}\/edit',
}

/**
 * @see \App\Http\Controllers\TestimonialController::edit
 * @see app\Http\Controllers\TestimonialController.php:146
 * @route /admin/testimonials/{slug}/edit
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
 * @see \App\Http\Controllers\TestimonialController::edit
 * @see app\Http\Controllers\TestimonialController.php:146
 * @route /admin/testimonials/{slug}/edit
 */
edit.get = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\TestimonialController::edit
 * @see app\Http\Controllers\TestimonialController.php:146
 * @route /admin/testimonials/{slug}/edit
 */
edit.head = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})


export default edit