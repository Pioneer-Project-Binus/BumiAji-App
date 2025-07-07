import { queryParams, type QueryParams } from './../../wayfinder'
/**
* @see \App\Http\Controllers\TestimonialController::index
 * @see app/Http/Controllers/TestimonialController.php:17
 * @route '/testimonials'
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
    url: '/testimonials',
}

/**
* @see \App\Http\Controllers\TestimonialController::index
 * @see app/Http/Controllers/TestimonialController.php:17
 * @route '/testimonials'
 */
index.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::index
 * @see app/Http/Controllers/TestimonialController.php:17
 * @route '/testimonials'
 */
index.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TestimonialController::index
 * @see app/Http/Controllers/TestimonialController.php:17
 * @route '/testimonials'
 */
index.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TestimonialController::create
 * @see app/Http/Controllers/TestimonialController.php:64
 * @route '/testimonials/create'
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
    url: '/testimonials/create',
}

/**
* @see \App\Http\Controllers\TestimonialController::create
 * @see app/Http/Controllers/TestimonialController.php:64
 * @route '/testimonials/create'
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::create
 * @see app/Http/Controllers/TestimonialController.php:64
 * @route '/testimonials/create'
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
 * @see app/Http/Controllers/TestimonialController.php:64
 * @route '/testimonials/create'
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
 * @see app/Http/Controllers/TestimonialController.php:70
 * @route '/testimonials'
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
    url: '/testimonials',
}

/**
* @see \App\Http\Controllers\TestimonialController::store
 * @see app/Http/Controllers/TestimonialController.php:70
 * @route '/testimonials'
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::store
 * @see app/Http/Controllers/TestimonialController.php:70
 * @route '/testimonials'
 */
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TestimonialController::archived
 * @see app/Http/Controllers/TestimonialController.php:236
 * @route '/testimonials/archived'
 */
export const archived = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: archived.url(options),
    method: 'get',
})

archived.definition = {
    methods: ['get','head'],
    url: '/testimonials/archived',
}

/**
* @see \App\Http\Controllers\TestimonialController::archived
 * @see app/Http/Controllers/TestimonialController.php:236
 * @route '/testimonials/archived'
 */
archived.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return archived.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::archived
 * @see app/Http/Controllers/TestimonialController.php:236
 * @route '/testimonials/archived'
 */
archived.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: archived.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TestimonialController::archived
 * @see app/Http/Controllers/TestimonialController.php:236
 * @route '/testimonials/archived'
 */
archived.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: archived.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TestimonialController::restore
 * @see app/Http/Controllers/TestimonialController.php:264
 * @route '/testimonials/{slug}/restore'
 */
export const restore = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: restore.url(args, options),
    method: 'put',
})

restore.definition = {
    methods: ['put'],
    url: '/testimonials/{slug}/restore',
}

/**
* @see \App\Http\Controllers\TestimonialController::restore
 * @see app/Http/Controllers/TestimonialController.php:264
 * @route '/testimonials/{slug}/restore'
 */
restore.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return restore.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::restore
 * @see app/Http/Controllers/TestimonialController.php:264
 * @route '/testimonials/{slug}/restore'
 */
restore.put = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'put',
} => ({
    url: restore.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\TestimonialController::deletePermanent
 * @see app/Http/Controllers/TestimonialController.php:277
 * @route '/testimonials/{slug}/delete-permanent'
 */
export const deletePermanent = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: deletePermanent.url(args, options),
    method: 'delete',
})

deletePermanent.definition = {
    methods: ['delete'],
    url: '/testimonials/{slug}/delete-permanent',
}

/**
* @see \App\Http\Controllers\TestimonialController::deletePermanent
 * @see app/Http/Controllers/TestimonialController.php:277
 * @route '/testimonials/{slug}/delete-permanent'
 */
deletePermanent.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return deletePermanent.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::deletePermanent
 * @see app/Http/Controllers/TestimonialController.php:277
 * @route '/testimonials/{slug}/delete-permanent'
 */
deletePermanent.delete = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: deletePermanent.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\TestimonialController::show
 * @see app/Http/Controllers/TestimonialController.php:117
 * @route '/testimonials/{slug}'
 */
export const show = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/testimonials/{slug}',
}

/**
* @see \App\Http\Controllers\TestimonialController::show
 * @see app/Http/Controllers/TestimonialController.php:117
 * @route '/testimonials/{slug}'
 */
show.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::show
 * @see app/Http/Controllers/TestimonialController.php:117
 * @route '/testimonials/{slug}'
 */
show.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TestimonialController::show
 * @see app/Http/Controllers/TestimonialController.php:117
 * @route '/testimonials/{slug}'
 */
show.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TestimonialController::edit
 * @see app/Http/Controllers/TestimonialController.php:145
 * @route '/testimonials/{slug}/edit'
 */
export const edit = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ['get','head'],
    url: '/testimonials/{slug}/edit',
}

/**
* @see \App\Http\Controllers\TestimonialController::edit
 * @see app/Http/Controllers/TestimonialController.php:145
 * @route '/testimonials/{slug}/edit'
 */
edit.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::edit
 * @see app/Http/Controllers/TestimonialController.php:145
 * @route '/testimonials/{slug}/edit'
 */
edit.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TestimonialController::edit
 * @see app/Http/Controllers/TestimonialController.php:145
 * @route '/testimonials/{slug}/edit'
 */
edit.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TestimonialController::update
 * @see app/Http/Controllers/TestimonialController.php:155
 * @route '/testimonials/{slug}'
 */
export const update = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ['post'],
    url: '/testimonials/{slug}',
}

/**
* @see \App\Http\Controllers\TestimonialController::update
 * @see app/Http/Controllers/TestimonialController.php:155
 * @route '/testimonials/{slug}'
 */
update.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::update
 * @see app/Http/Controllers/TestimonialController.php:155
 * @route '/testimonials/{slug}'
 */
update.post = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\TestimonialController::destroy
 * @see app/Http/Controllers/TestimonialController.php:214
 * @route '/testimonials/{slug}'
 */
export const destroy = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ['delete'],
    url: '/testimonials/{slug}',
}

/**
* @see \App\Http\Controllers\TestimonialController::destroy
 * @see app/Http/Controllers/TestimonialController.php:214
 * @route '/testimonials/{slug}'
 */
destroy.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::destroy
 * @see app/Http/Controllers/TestimonialController.php:214
 * @route '/testimonials/{slug}'
 */
destroy.delete = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const testimonials = {
    index,
create,
store,
archived,
restore,
deletePermanent,
show,
edit,
update,
destroy,
}

export default testimonials