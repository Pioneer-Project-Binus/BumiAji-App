import { queryParams, type QueryParams } from './../../../../wayfinder'

/**
 * @see \App\Http\Controllers\TestimonialController::indexe5229197286c371bae620517afbabac3
 * @see app\Http\Controllers\TestimonialController.php:17
 * @route /testimoni
 */
const indexe5229197286c371bae620517afbabac3 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexe5229197286c371bae620517afbabac3.url(options),
    method: 'get',
})

indexe5229197286c371bae620517afbabac3.definition = {
    methods: ['get','head'],
    url: '\/testimoni',
}

/**
 * @see \App\Http\Controllers\TestimonialController::indexe5229197286c371bae620517afbabac3
 * @see app\Http\Controllers\TestimonialController.php:17
 * @route /testimoni
 */
indexe5229197286c371bae620517afbabac3.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexe5229197286c371bae620517afbabac3.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\TestimonialController::indexe5229197286c371bae620517afbabac3
 * @see app\Http\Controllers\TestimonialController.php:17
 * @route /testimoni
 */
indexe5229197286c371bae620517afbabac3.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexe5229197286c371bae620517afbabac3.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\TestimonialController::indexe5229197286c371bae620517afbabac3
 * @see app\Http\Controllers\TestimonialController.php:17
 * @route /testimoni
 */
indexe5229197286c371bae620517afbabac3.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexe5229197286c371bae620517afbabac3.url(options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\TestimonialController::index7507fc3b8406dcbe108a826c4433c028
 * @see app\Http\Controllers\TestimonialController.php:17
 * @route /admin/testimonials
 */
const index7507fc3b8406dcbe108a826c4433c028 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index7507fc3b8406dcbe108a826c4433c028.url(options),
    method: 'get',
})

index7507fc3b8406dcbe108a826c4433c028.definition = {
    methods: ['get','head'],
    url: '\/admin\/testimonials',
}

/**
 * @see \App\Http\Controllers\TestimonialController::index7507fc3b8406dcbe108a826c4433c028
 * @see app\Http\Controllers\TestimonialController.php:17
 * @route /admin/testimonials
 */
index7507fc3b8406dcbe108a826c4433c028.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index7507fc3b8406dcbe108a826c4433c028.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\TestimonialController::index7507fc3b8406dcbe108a826c4433c028
 * @see app\Http\Controllers\TestimonialController.php:17
 * @route /admin/testimonials
 */
index7507fc3b8406dcbe108a826c4433c028.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index7507fc3b8406dcbe108a826c4433c028.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\TestimonialController::index7507fc3b8406dcbe108a826c4433c028
 * @see app\Http\Controllers\TestimonialController.php:17
 * @route /admin/testimonials
 */
index7507fc3b8406dcbe108a826c4433c028.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index7507fc3b8406dcbe108a826c4433c028.url(options),
    method: 'head',
})

export const index = {
    '\/testimoni': indexe5229197286c371bae620517afbabac3,
    '\/admin\/testimonials': index7507fc3b8406dcbe108a826c4433c028,
}


/**
 * @see \App\Http\Controllers\TestimonialController::show2f31c51c4aa7bcff7821cc261341af07
 * @see app\Http\Controllers\TestimonialController.php:119
 * @route /testimoni/{slug}
 */
const show2f31c51c4aa7bcff7821cc261341af07 = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show2f31c51c4aa7bcff7821cc261341af07.url(args, options),
    method: 'get',
})

show2f31c51c4aa7bcff7821cc261341af07.definition = {
    methods: ['get','head'],
    url: '\/testimoni\/{slug}',
}

/**
 * @see \App\Http\Controllers\TestimonialController::show2f31c51c4aa7bcff7821cc261341af07
 * @see app\Http\Controllers\TestimonialController.php:119
 * @route /testimoni/{slug}
 */
show2f31c51c4aa7bcff7821cc261341af07.url = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show2f31c51c4aa7bcff7821cc261341af07.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\TestimonialController::show2f31c51c4aa7bcff7821cc261341af07
 * @see app\Http\Controllers\TestimonialController.php:119
 * @route /testimoni/{slug}
 */
show2f31c51c4aa7bcff7821cc261341af07.get = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show2f31c51c4aa7bcff7821cc261341af07.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\TestimonialController::show2f31c51c4aa7bcff7821cc261341af07
 * @see app\Http\Controllers\TestimonialController.php:119
 * @route /testimoni/{slug}
 */
show2f31c51c4aa7bcff7821cc261341af07.head = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show2f31c51c4aa7bcff7821cc261341af07.url(args, options),
    method: 'head',
})

/**
 * @see \App\Http\Controllers\TestimonialController::show28b4be495a48bd2fcbc975c49012488e
 * @see app\Http\Controllers\TestimonialController.php:119
 * @route /admin/testimonials/{slug}
 */
const show28b4be495a48bd2fcbc975c49012488e = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show28b4be495a48bd2fcbc975c49012488e.url(args, options),
    method: 'get',
})

show28b4be495a48bd2fcbc975c49012488e.definition = {
    methods: ['get','head'],
    url: '\/admin\/testimonials\/{slug}',
}

/**
 * @see \App\Http\Controllers\TestimonialController::show28b4be495a48bd2fcbc975c49012488e
 * @see app\Http\Controllers\TestimonialController.php:119
 * @route /admin/testimonials/{slug}
 */
show28b4be495a48bd2fcbc975c49012488e.url = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show28b4be495a48bd2fcbc975c49012488e.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\TestimonialController::show28b4be495a48bd2fcbc975c49012488e
 * @see app\Http\Controllers\TestimonialController.php:119
 * @route /admin/testimonials/{slug}
 */
show28b4be495a48bd2fcbc975c49012488e.get = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show28b4be495a48bd2fcbc975c49012488e.url(args, options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\TestimonialController::show28b4be495a48bd2fcbc975c49012488e
 * @see app\Http\Controllers\TestimonialController.php:119
 * @route /admin/testimonials/{slug}
 */
show28b4be495a48bd2fcbc975c49012488e.head = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show28b4be495a48bd2fcbc975c49012488e.url(args, options),
    method: 'head',
})

export const show = {
    '\/testimoni\/{slug}': show2f31c51c4aa7bcff7821cc261341af07,
    '\/admin\/testimonials\/{slug}': show28b4be495a48bd2fcbc975c49012488e,
}


/**
 * @see \App\Http\Controllers\TestimonialController::create
 * @see app\Http\Controllers\TestimonialController.php:66
 * @route /admin/testimonials/create
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
    url: '\/admin\/testimonials\/create',
}

/**
 * @see \App\Http\Controllers\TestimonialController::create
 * @see app\Http\Controllers\TestimonialController.php:66
 * @route /admin/testimonials/create
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
 * @see \App\Http\Controllers\TestimonialController::create
 * @see app\Http\Controllers\TestimonialController.php:66
 * @route /admin/testimonials/create
 */
create.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: create.url(options),
    method: 'get',
})

/**
 * @see \App\Http\Controllers\TestimonialController::create
 * @see app\Http\Controllers\TestimonialController.php:66
 * @route /admin/testimonials/create
 */
create.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: create.url(options),
    method: 'head',
})


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


/**
 * @see \App\Http\Controllers\TestimonialController::update
 * @see app\Http\Controllers\TestimonialController.php:156
 * @route /admin/testimonials/{slug}
 */
export const update = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ['post'],
    url: '\/admin\/testimonials\/{slug}',
}

/**
 * @see \App\Http\Controllers\TestimonialController::update
 * @see app\Http\Controllers\TestimonialController.php:156
 * @route /admin/testimonials/{slug}
 */
update.url = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return update.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see \App\Http\Controllers\TestimonialController::update
 * @see app\Http\Controllers\TestimonialController.php:156
 * @route /admin/testimonials/{slug}
 */
update.post = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})


/**
 * @see \App\Http\Controllers\TestimonialController::destroy
 * @see app\Http\Controllers\TestimonialController.php:215
 * @route /admin/testimonials/{slug}
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
    url: '\/admin\/testimonials\/{slug}',
}

/**
 * @see \App\Http\Controllers\TestimonialController::destroy
 * @see app\Http\Controllers\TestimonialController.php:215
 * @route /admin/testimonials/{slug}
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
 * @see \App\Http\Controllers\TestimonialController::destroy
 * @see app\Http\Controllers\TestimonialController.php:215
 * @route /admin/testimonials/{slug}
 */
destroy.delete = (args: { slug: string | number } | [slug: string | number] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})


const TestimonialController = { index, show, create, store, edit, update, destroy }

export default TestimonialController