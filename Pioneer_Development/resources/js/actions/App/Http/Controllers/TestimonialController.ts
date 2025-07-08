import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TestimonialController::indexPublic
 * @see app/Http/Controllers/TestimonialController.php:16
 * @route '/testimoni'
 */
export const indexPublic = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexPublic.url(options),
    method: 'get',
})

indexPublic.definition = {
    methods: ['get','head'],
    url: '/testimoni',
}

/**
* @see \App\Http\Controllers\TestimonialController::indexPublic
 * @see app/Http/Controllers/TestimonialController.php:16
 * @route '/testimoni'
 */
indexPublic.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexPublic.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::indexPublic
 * @see app/Http/Controllers/TestimonialController.php:16
 * @route '/testimoni'
 */
indexPublic.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexPublic.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TestimonialController::indexPublic
 * @see app/Http/Controllers/TestimonialController.php:16
 * @route '/testimoni'
 */
indexPublic.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexPublic.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TestimonialController::showPublic
 * @see app/Http/Controllers/TestimonialController.php:153
 * @route '/testimoni/{slug}'
 */
export const showPublic = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showPublic.url(args, options),
    method: 'get',
})

showPublic.definition = {
    methods: ['get','head'],
    url: '/testimoni/{slug}',
}

/**
* @see \App\Http\Controllers\TestimonialController::showPublic
 * @see app/Http/Controllers/TestimonialController.php:153
 * @route '/testimoni/{slug}'
 */
showPublic.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return showPublic.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::showPublic
 * @see app/Http/Controllers/TestimonialController.php:153
 * @route '/testimoni/{slug}'
 */
showPublic.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showPublic.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TestimonialController::showPublic
 * @see app/Http/Controllers/TestimonialController.php:153
 * @route '/testimoni/{slug}'
 */
showPublic.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showPublic.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TestimonialController::indexAdmin
 * @see app/Http/Controllers/TestimonialController.php:53
 * @route '/testimonials'
 */
export const indexAdmin = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexAdmin.url(options),
    method: 'get',
})

indexAdmin.definition = {
    methods: ['get','head'],
    url: '/testimonials',
}

/**
* @see \App\Http\Controllers\TestimonialController::indexAdmin
 * @see app/Http/Controllers/TestimonialController.php:53
 * @route '/testimonials'
 */
indexAdmin.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexAdmin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::indexAdmin
 * @see app/Http/Controllers/TestimonialController.php:53
 * @route '/testimonials'
 */
indexAdmin.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexAdmin.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TestimonialController::indexAdmin
 * @see app/Http/Controllers/TestimonialController.php:53
 * @route '/testimonials'
 */
indexAdmin.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexAdmin.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TestimonialController::create
 * @see app/Http/Controllers/TestimonialController.php:91
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
 * @see app/Http/Controllers/TestimonialController.php:91
 * @route '/testimonials/create'
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::create
 * @see app/Http/Controllers/TestimonialController.php:91
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
 * @see app/Http/Controllers/TestimonialController.php:91
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
 * @see app/Http/Controllers/TestimonialController.php:96
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
 * @see app/Http/Controllers/TestimonialController.php:96
 * @route '/testimonials'
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::store
 * @see app/Http/Controllers/TestimonialController.php:96
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
* @see \App\Http\Controllers\TestimonialController::archivedIndex
 * @see app/Http/Controllers/TestimonialController.php:300
 * @route '/testimonials/archived'
 */
export const archivedIndex = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: archivedIndex.url(options),
    method: 'get',
})

archivedIndex.definition = {
    methods: ['get','head'],
    url: '/testimonials/archived',
}

/**
* @see \App\Http\Controllers\TestimonialController::archivedIndex
 * @see app/Http/Controllers/TestimonialController.php:300
 * @route '/testimonials/archived'
 */
archivedIndex.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return archivedIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::archivedIndex
 * @see app/Http/Controllers/TestimonialController.php:300
 * @route '/testimonials/archived'
 */
archivedIndex.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: archivedIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TestimonialController::archivedIndex
 * @see app/Http/Controllers/TestimonialController.php:300
 * @route '/testimonials/archived'
 */
archivedIndex.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: archivedIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TestimonialController::restore
 * @see app/Http/Controllers/TestimonialController.php:328
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
 * @see app/Http/Controllers/TestimonialController.php:328
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
 * @see app/Http/Controllers/TestimonialController.php:328
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
 * @see app/Http/Controllers/TestimonialController.php:341
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
 * @see app/Http/Controllers/TestimonialController.php:341
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
 * @see app/Http/Controllers/TestimonialController.php:341
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
* @see \App\Http\Controllers\TestimonialController::showAdmin
 * @see app/Http/Controllers/TestimonialController.php:174
 * @route '/testimonials/{slug}'
 */
export const showAdmin = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showAdmin.url(args, options),
    method: 'get',
})

showAdmin.definition = {
    methods: ['get','head'],
    url: '/testimonials/{slug}',
}

/**
* @see \App\Http\Controllers\TestimonialController::showAdmin
 * @see app/Http/Controllers/TestimonialController.php:174
 * @route '/testimonials/{slug}'
 */
showAdmin.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return showAdmin.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::showAdmin
 * @see app/Http/Controllers/TestimonialController.php:174
 * @route '/testimonials/{slug}'
 */
showAdmin.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showAdmin.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TestimonialController::showAdmin
 * @see app/Http/Controllers/TestimonialController.php:174
 * @route '/testimonials/{slug}'
 */
showAdmin.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showAdmin.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\TestimonialController::edit
 * @see app/Http/Controllers/TestimonialController.php:198
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
 * @see app/Http/Controllers/TestimonialController.php:198
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
 * @see app/Http/Controllers/TestimonialController.php:198
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
 * @see app/Http/Controllers/TestimonialController.php:198
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
 * @see app/Http/Controllers/TestimonialController.php:208
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
 * @see app/Http/Controllers/TestimonialController.php:208
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
 * @see app/Http/Controllers/TestimonialController.php:208
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
 * @see app/Http/Controllers/TestimonialController.php:278
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
 * @see app/Http/Controllers/TestimonialController.php:278
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
 * @see app/Http/Controllers/TestimonialController.php:278
 * @route '/testimonials/{slug}'
 */
destroy.delete = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const TestimonialController = { indexPublic, showPublic, indexAdmin, create, store, archivedIndex, restore, deletePermanent, showAdmin, edit, update, destroy }

export default TestimonialController