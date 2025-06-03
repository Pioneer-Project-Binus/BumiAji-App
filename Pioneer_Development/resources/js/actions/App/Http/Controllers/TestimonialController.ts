import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TestimonialController::index
 * @see app/Http/Controllers/TestimonialController.php:17
 * @route '/testimoni'
 */
const index012106d2e788bb2670ac9266fb0a0f45 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index012106d2e788bb2670ac9266fb0a0f45.url(options),
    method: 'get',
})

index012106d2e788bb2670ac9266fb0a0f45.definition = {
    methods: ['get','head'],
    url: '/testimoni',
}

/**
* @see \App\Http\Controllers\TestimonialController::index
 * @see app/Http/Controllers/TestimonialController.php:17
 * @route '/testimoni'
 */
index012106d2e788bb2670ac9266fb0a0f45.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return index012106d2e788bb2670ac9266fb0a0f45.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::index
 * @see app/Http/Controllers/TestimonialController.php:17
 * @route '/testimoni'
 */
index012106d2e788bb2670ac9266fb0a0f45.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: index012106d2e788bb2670ac9266fb0a0f45.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TestimonialController::index
 * @see app/Http/Controllers/TestimonialController.php:17
 * @route '/testimoni'
 */
index012106d2e788bb2670ac9266fb0a0f45.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: index012106d2e788bb2670ac9266fb0a0f45.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TestimonialController::index
 * @see app/Http/Controllers/TestimonialController.php:17
 * @route '/testimonials'
 */
const indexa9648b9abca0d2e8d6db8e89140565d1 = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexa9648b9abca0d2e8d6db8e89140565d1.url(options),
    method: 'get',
})

indexa9648b9abca0d2e8d6db8e89140565d1.definition = {
    methods: ['get','head'],
    url: '/testimonials',
}

/**
* @see \App\Http\Controllers\TestimonialController::index
 * @see app/Http/Controllers/TestimonialController.php:17
 * @route '/testimonials'
 */
indexa9648b9abca0d2e8d6db8e89140565d1.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return indexa9648b9abca0d2e8d6db8e89140565d1.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::index
 * @see app/Http/Controllers/TestimonialController.php:17
 * @route '/testimonials'
 */
indexa9648b9abca0d2e8d6db8e89140565d1.get = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: indexa9648b9abca0d2e8d6db8e89140565d1.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TestimonialController::index
 * @see app/Http/Controllers/TestimonialController.php:17
 * @route '/testimonials'
 */
indexa9648b9abca0d2e8d6db8e89140565d1.head = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: indexa9648b9abca0d2e8d6db8e89140565d1.url(options),
    method: 'head',
})

export const index = {
    '/testimoni': index012106d2e788bb2670ac9266fb0a0f45,
    '/testimonials': indexa9648b9abca0d2e8d6db8e89140565d1,
}

/**
* @see \App\Http\Controllers\TestimonialController::show
 * @see app/Http/Controllers/TestimonialController.php:119
 * @route '/testimoni/{slug}'
 */
const show81dbcf4e00b8597595990bf5d2b5db62 = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show81dbcf4e00b8597595990bf5d2b5db62.url(args, options),
    method: 'get',
})

show81dbcf4e00b8597595990bf5d2b5db62.definition = {
    methods: ['get','head'],
    url: '/testimoni/{slug}',
}

/**
* @see \App\Http\Controllers\TestimonialController::show
 * @see app/Http/Controllers/TestimonialController.php:119
 * @route '/testimoni/{slug}'
 */
show81dbcf4e00b8597595990bf5d2b5db62.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return show81dbcf4e00b8597595990bf5d2b5db62.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::show
 * @see app/Http/Controllers/TestimonialController.php:119
 * @route '/testimoni/{slug}'
 */
show81dbcf4e00b8597595990bf5d2b5db62.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show81dbcf4e00b8597595990bf5d2b5db62.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TestimonialController::show
 * @see app/Http/Controllers/TestimonialController.php:119
 * @route '/testimoni/{slug}'
 */
show81dbcf4e00b8597595990bf5d2b5db62.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show81dbcf4e00b8597595990bf5d2b5db62.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TestimonialController::show
 * @see app/Http/Controllers/TestimonialController.php:119
 * @route '/testimonials/{slug}'
 */
const showd995e4c367ebfdb22542cf73fe1bc04d = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showd995e4c367ebfdb22542cf73fe1bc04d.url(args, options),
    method: 'get',
})

showd995e4c367ebfdb22542cf73fe1bc04d.definition = {
    methods: ['get','head'],
    url: '/testimonials/{slug}',
}

/**
* @see \App\Http\Controllers\TestimonialController::show
 * @see app/Http/Controllers/TestimonialController.php:119
 * @route '/testimonials/{slug}'
 */
showd995e4c367ebfdb22542cf73fe1bc04d.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
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

    return showd995e4c367ebfdb22542cf73fe1bc04d.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::show
 * @see app/Http/Controllers/TestimonialController.php:119
 * @route '/testimonials/{slug}'
 */
showd995e4c367ebfdb22542cf73fe1bc04d.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: showd995e4c367ebfdb22542cf73fe1bc04d.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TestimonialController::show
 * @see app/Http/Controllers/TestimonialController.php:119
 * @route '/testimonials/{slug}'
 */
showd995e4c367ebfdb22542cf73fe1bc04d.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: showd995e4c367ebfdb22542cf73fe1bc04d.url(args, options),
    method: 'head',
})

export const show = {
    '/testimoni/{slug}': show81dbcf4e00b8597595990bf5d2b5db62,
    '/testimonials/{slug}': showd995e4c367ebfdb22542cf73fe1bc04d,
}

/**
* @see \App\Http\Controllers\TestimonialController::create
 * @see app/Http/Controllers/TestimonialController.php:66
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
 * @see app/Http/Controllers/TestimonialController.php:66
 * @route '/testimonials/create'
 */
create.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::create
 * @see app/Http/Controllers/TestimonialController.php:66
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
 * @see app/Http/Controllers/TestimonialController.php:66
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
 * @see app/Http/Controllers/TestimonialController.php:72
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
 * @see app/Http/Controllers/TestimonialController.php:72
 * @route '/testimonials'
 */
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TestimonialController::store
 * @see app/Http/Controllers/TestimonialController.php:72
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
* @see \App\Http\Controllers\TestimonialController::edit
 * @see app/Http/Controllers/TestimonialController.php:146
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
 * @see app/Http/Controllers/TestimonialController.php:146
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
 * @see app/Http/Controllers/TestimonialController.php:146
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
 * @see app/Http/Controllers/TestimonialController.php:146
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
 * @see app/Http/Controllers/TestimonialController.php:156
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
 * @see app/Http/Controllers/TestimonialController.php:156
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
 * @see app/Http/Controllers/TestimonialController.php:156
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
 * @see app/Http/Controllers/TestimonialController.php:215
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
 * @see app/Http/Controllers/TestimonialController.php:215
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
 * @see app/Http/Controllers/TestimonialController.php:215
 * @route '/testimonials/{slug}'
 */
destroy.delete = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'delete',
} => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const TestimonialController = { index, show, create, store, edit, update, destroy }

export default TestimonialController