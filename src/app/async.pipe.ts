/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { ChangeDetectorRef, EventEmitter, Injectable, OnDestroy, Pipe, PipeTransform, WrappedValue, ɵisObservable, ɵisPromise, ɵlooseIdentical, OnChanges } from '@angular/core';
import { Observable, SubscriptionLike } from 'rxjs';

interface SubscriptionStrategy {
  createSubscription(async: Observable<any> | Promise<any>, updateLatestValue: any): SubscriptionLike
    | Promise<any>;
  dispose(subscription: SubscriptionLike | Promise<any>): void;
  onDestroy(subscription: SubscriptionLike | Promise<any>): void;
}

class ObservableStrategy implements SubscriptionStrategy {
  createSubscription(async: Observable<any>, updateLatestValue: any): SubscriptionLike {
    return async.subscribe({
      next: updateLatestValue,
      error: (e: any) => { throw e; },
      complete: () => console.log('Async: Complete!')
    });
  }

  dispose(subscription: SubscriptionLike): void {
    subscription.unsubscribe();
  }

  onDestroy(subscription: SubscriptionLike): void {
    subscription.unsubscribe();
  }
}

class PromiseStrategy implements SubscriptionStrategy {
  createSubscription(async: Promise<any>, updateLatestValue: (v: any) => any): Promise<any> {
    return async.then(updateLatestValue, e => { throw e; });
  }

  dispose(subscription: Promise<any>): void { }

  onDestroy(subscription: Promise<any>): void { }
}

const _promiseStrategy = new PromiseStrategy();
const _observableStrategy = new ObservableStrategy();

/**
 * @ngModule CommonModule
 * @description
 *
 * Unwraps a value from an asynchronous primitive.
 *
 * The `async` pipe subscribes to an `Observable` or `Promise` and returns the latest value it has
 * emitted. When a new value is emitted, the `async` pipe marks the component to be checked for
 * changes. When the component gets destroyed, the `async` pipe unsubscribes automatically to avoid
 * potential memory leaks.
 *
 * @usageNotes
 *
 * ### Examples
 *
 * This example binds a `Promise` to the view. Clicking the `Resolve` button resolves the
 * promise.
 *
 * {@example common/pipes/ts/async_pipe.ts region='AsyncPipePromise'}
 *
 * It's also possible to use `async` with Observables. The example below binds the `time` Observable
 * to the view. The Observable continuously updates the view with the current time.
 *
 * {@example common/pipes/ts/async_pipe.ts region='AsyncPipeObservable'}
 *
 * @publicApi
 */
@Injectable()
@Pipe({ name: 'async', pure: false })
export class AsyncPipe implements OnDestroy, PipeTransform {
  
  private _latestValue: any = null;
  private _latestReturnedValue: any = null;

  private _subscription: SubscriptionLike | Promise<any> | null = null;
  private _obj: Observable<any> | Promise<any> | EventEmitter<any> | null = null;
  private _strategy: SubscriptionStrategy = null!;

  constructor(private _ref: ChangeDetectorRef) {
    console.log('Async: Creating Async Pipe!')
  }

  ngOnDestroy(): void {
    console.log('Async: Destroying Async Pipe!');
    if (this._subscription) {
      console.log('Async: Subscription exists, unsubscribing');
      this._dispose();
    }
  }

  transform<T>(obj: null): null;
  transform<T>(obj: undefined): undefined;
  transform<T>(obj: Observable<T> | null | undefined): T | null;
  transform<T>(obj: Promise<T> | null | undefined): T | null;
  transform(obj: Observable<any> | Promise<any> | null | undefined): any {
    if (!this._obj) {
      if (obj) {
        this._subscribe(obj);
      }

      console.log('Async: Initial Value = ' + this._latestValue);
      this._latestReturnedValue = this._latestValue;
      return this._latestValue;
    }

    if (obj !== this._obj) {
      console.log('Async: Observable has been reassigned');
      console.log('Async: Unsubscribing & Transforming')
      this._dispose();
      return this.transform(obj as any);
    }

    if (ɵlooseIdentical(this._latestValue, this._latestReturnedValue)) {
      console.log('Async: Value is identical, Value = ' + this._latestValue);
      return this._latestReturnedValue;
    }

    this._latestReturnedValue = this._latestValue;
    return WrappedValue.wrap(this._latestValue);
  }

  private _subscribe(obj: Observable<any> | Promise<any> | EventEmitter<any>): void {
    this._obj = obj;
    this._strategy = this._selectStrategy(obj);
    console.log('Async: Creating Subscription!')
    this._subscription = this._strategy.createSubscription(
      obj, (value: Object) => { 
        // console.log('Async: Value = ' + JSON.stringify(value));
        console.log('Async: Value = ' + value);
        return this._updateLatestValue(obj, value) 
      }
    );
  }

  private _selectStrategy(obj: Observable<any> | Promise<any> | EventEmitter<any>): any {
    if (ɵisPromise(obj)) {
      return _promiseStrategy;
    }

    if (ɵisObservable(obj)) {
      return _observableStrategy;
    }

    throw 'A problem occurred';
  }

  private _dispose(): void {
    // console.log('Async: Unsubscribing!')
    this._strategy.dispose(this._subscription!);
    this._latestValue = null;
    this._latestReturnedValue = null;
    this._subscription = null;
    this._obj = null;
  }

  private _updateLatestValue(async: any, value: Object): void {
    if (async === this._obj) {
      console.log('Async: Marking Component to be Checked')
      this._latestValue = value;
      this._ref.markForCheck();
    }
  }
}